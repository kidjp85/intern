import Task from '@dojo/core/async/Task';
import { stub, SinonStub, spy, SinonSpy } from 'sinon';
import intern from '../../../src/index';

const { registerSuite } = intern().getInterface('object');
const assert = intern().getAssertions('assert');
const mockRequire = intern().getPlugin<mocking.MockRequire>('mockRequire');

registerSuite('bin/intern', function () {
	const mockNodeUtil: { [name: string]: SinonSpy } = {
		getConfig: spy(() => {
			return Task.resolve(configData);
		})
	};

	const mockCommonUtil: { [name: string]: SinonSpy } = {
		getConfigDescription: spy(() => {
			return 'foo';
		})
	};

	let configData: any;
	let logStub: SinonStub | undefined;
	const originalExitCode = process.exitCode;
	let removeMocks: (() => void) | undefined;

	return {
		beforeEach() {
			Object.keys(mockNodeUtil).forEach(key => mockNodeUtil[key].reset());
			Object.keys(mockCommonUtil).forEach(key => mockCommonUtil[key].reset());
			configData = {};
		},

		afterEach() {
			if (removeMocks) {
				removeMocks();
				removeMocks = undefined;
			}

			if (logStub) {
				logStub.restore();
				logStub = undefined;
			}

			process.exitCode = originalExitCode;
		},

		tests: {
			'basic run'() {
				return mockRequire(require, 'src/bin/intern', {
					'src/lib/node/runner': { default: () => Task.resolve() },
					'src/lib/node/util': mockNodeUtil,
					'src/lib/common/util': mockCommonUtil,
					'src/index': { default: () => {} }
				}).then(handle => {
					removeMocks = handle.remove;
					assert.equal(mockNodeUtil.getConfig.callCount, 1);
					assert.equal(mockCommonUtil.getConfigDescription.callCount, 0);
				});
			},

			'show configs'() {
				configData = { showConfigs: true };
				logStub = stub(console, 'log');

				return mockRequire(require, 'src/bin/intern', {
					'src/lib/node/runner': { default: () => Task.resolve() },
					'src/lib/node/util': mockNodeUtil,
					'src/lib/common/util': mockCommonUtil,
					'src/index': { default: () => {} }
				}).then(handle => {
					removeMocks = handle.remove;
					assert.equal(mockNodeUtil.getConfig.callCount, 1);
					assert.equal(mockCommonUtil.getConfigDescription.callCount, 1);
					assert.equal(logStub!.callCount, 1, 'expected log to be called once');
					assert.equal(logStub!.getCall(0).args[0], 'foo', 'unexpected description');
				});
			},

			'bad run': {
				'intern defined'() {
					const origExitCode = process.exitCode;
					logStub = stub(console, 'error');

					return mockRequire(require, 'src/bin/intern', {
						'src/lib/node/runner': { default: () => Task.reject(new Error('fail')) },
						'src/lib/node/util': mockNodeUtil,
						'src/lib/common/util': mockCommonUtil,
						'src/index': { default: () => {} }
					}).then(handle => {
						removeMocks = handle.remove;
						process.exitCode = origExitCode;
						assert.equal(logStub!.callCount, 0, 'expected error not to be called');
					});
				},

				'intern not defined'() {
					const messageLogged = new Promise(resolve => {
						logStub = stub(console, 'error').callsFake(resolve);
					});

					return mockRequire(require, 'src/bin/intern', {
						'src/lib/node/runner': { default: () => Task.reject(new Error('fail')) },
						'src/lib/node/util': mockNodeUtil,
						'src/lib/common/util': mockCommonUtil,
						'src/index': { default: () => {} }
					}).then(handle => {
						removeMocks = handle.remove;
						return messageLogged;
					}).then(() => {
						assert.equal(logStub!.callCount, 1, 'expected error to be called once');
					});
				}
			}
		}
	};
});