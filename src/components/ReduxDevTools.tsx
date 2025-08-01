'use client';

export default function ReduxDevTools() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Redux DevTools</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <h4 className="font-semibold text-indigo-800 mb-2">Browser Extension</h4>
          <p className="text-sm text-indigo-700 mb-3">
            Install the Redux DevTools browser extension for advanced debugging:
          </p>
          <div className="space-y-2 text-xs">
            <a 
              href="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-indigo-600 hover:text-indigo-800 underline transition-colors"
            >
              Chrome Extension
            </a>
            <a 
              href="https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-indigo-600 hover:text-indigo-800 underline transition-colors"
            >
              Firefox Extension
            </a>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">Features Available</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• <strong>Time Travel:</strong> Jump to any previous state</li>
            <li>• <strong>Action Log:</strong> See all dispatched actions</li>
            <li>• <strong>State Inspection:</strong> Examine current state structure</li>
            <li>• <strong>Performance:</strong> Monitor state update performance</li>
            <li>• <strong>Diff View:</strong> See what changed between actions</li>
          </ul>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-yellow-800 mb-2">How to Use</h4>
          <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
            <li>Install the browser extension</li>
            <li>Open DevTools (F12)</li>
            <li>Go to the "Redux" tab</li>
            <li>Interact with the app to see actions</li>
            <li>Click on any action to see state changes</li>
          </ol>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Redux Toolkit Benefits</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>Automatic Setup:</strong> DevTools enabled by default</li>
            <li>• <strong>Better Actions:</strong> More descriptive action names</li>
            <li>• <strong>Immer Integration:</strong> Cleaner state diffs</li>
            <li>• <strong>Async Thunks:</strong> Track async operation states</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 