import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  RefreshCw, 
  X, 
  Copy, 
  MoreVertical,
  Settings,
  Trash2,
  CheckCircle,
  Code,
  Play
} from 'lucide-react';

interface Connector {
  id: string;
  name: string;
  status: 'connected' | 'disconnected';
  trading: boolean;
  accountGroup?: string;
}

const TradingViewPage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSyntaxGenerator, setShowSyntaxGenerator] = useState(false);
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [connectorName, setConnectorName] = useState('');
  const [selectedOrderType, setSelectedOrderType] = useState('Strategy Order');
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const orderTypes = [
    'Strategy Order',
    'Market Order', 
    'Limit Order',
    'Cancel Order',
    'Close Position'
  ];

  const generatedCode = `{
  "type": "strategy_order",
  "symbol": "{{ticker}}",
  "volume": "{{strategy.position_size}}",
  "position_size": "{{strategy.position_size}}",
  "side": "{{strategy.order.action}}",
  "current_price": "{{close}}",
  "exit_on_opposite": 0
}`;

  const handleCreateConnector = (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectorName.trim()) return;

    const newConnector: Connector = {
      id: Date.now().toString(),
      name: connectorName,
      status: 'disconnected',
      trading: true
    };

    setConnectors([...connectors, newConnector]);
    setConnectorName('');
    setShowCreateModal(false);
    
    // Show success message
    setSuccessMessage(`Bridge ${connectorName} Created Successfully !`);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleGenerateSyntax = (connector: Connector) => {
    setSelectedConnector(connector);
    setShowSyntaxGenerator(true);
  };

  const toggleTrading = (connectorId: string) => {
    setConnectors(connectors.map(conn => 
      conn.id === connectorId 
        ? { ...conn, trading: !conn.trading }
        : conn
    ));
  };

  const deleteConnector = (connectorId: string) => {
    setConnectors(connectors.filter(conn => conn.id !== connectorId));
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
  };

  return (
    <div className="p-6">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 shadow-lg">
            <CheckCircle className="w-5 h-5" />
            <span>{successMessage}</span>
            <button 
              onClick={() => setShowSuccessMessage(false)}
              className="ml-2 text-white hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-semibold">Trading View Connector</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Connector</span>
          </button>
          <div className="flex items-center space-x-2">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
              Trading View Connection
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
              Custom Bridge
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500">
            <option>Sort by</option>
            <option>Name</option>
            <option>Status</option>
            <option>Date Created</option>
          </select>
        </div>
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Connectors List */}
      {connectors.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <h3 className="text-gray-400 text-lg font-medium mb-2">No Connector Available.</h3>
        </div>
      ) : (
        <div className="space-y-4">
          {connectors.map((connector) => (
            <div key={connector.id} className="bg-gray-800 rounded-lg border border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h3 className="text-white font-semibold text-lg">{connector.name}</h3>
                  <div className="flex items-center space-x-2">
                    <Copy className="w-4 h-4 text-orange-500" />
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleGenerateSyntax(connector)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Generate Syntax
                  </button>
                  <button
                    onClick={() => deleteConnector(connector.id)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="text-gray-400 text-sm">
                  Please Connect Account/Group
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">Trading</span>
                    <button
                      onClick={() => toggleTrading(connector.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        connector.trading ? 'bg-green-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          connector.trading ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Connector Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-lg font-semibold flex items-center">
                <div className="w-6 h-6 bg-blue-600 rounded mr-2 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                Create Connector
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateConnector} className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={connectorName}
                  onChange={(e) => setConnectorName(e.target.value)}
                  placeholder="Enter Bridge Name"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Syntax Generator Modal */}
      {showSyntaxGenerator && selectedConnector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg w-full max-w-6xl mx-4 h-5/6 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-white text-xl font-semibold">Syntax Generator</h2>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-white font-medium">{selectedConnector.name}</span>
                <span className="text-gray-400">Bridge Name</span>
                <Copy className="w-5 h-5 text-orange-500" />
                <button
                  onClick={() => setShowSyntaxGenerator(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Order Type Buttons */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex space-x-2">
                {orderTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedOrderType(type)}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2 ${
                      selectedOrderType === type
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {type === 'Strategy Order' && <Play className="w-4 h-4" />}
                    {type === 'Market Order' && <div className="w-4 h-4 bg-blue-500 rounded"></div>}
                    {type === 'Limit Order' && <div className="w-4 h-4 bg-yellow-500 rounded"></div>}
                    {type === 'Cancel Order' && <div className="w-4 h-4 bg-red-500 rounded"></div>}
                    {type === 'Close Position' && <div className="w-4 h-4 bg-purple-500 rounded"></div>}
                    <span>{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex">
              {/* Left Panel - Form */}
              <div className="w-1/2 p-6 border-r border-gray-700">
                <div className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Trading Symbol <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={selectedSymbol}
                      onChange={(e) => setSelectedSymbol(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                    >
                      <option value="">Select Symbol</option>
                      <option value="EURUSD">EURUSD</option>
                      <option value="GBPUSD">GBPUSD</option>
                      <option value="USDJPY">USDJPY</option>
                      <option value="AUDUSD">AUDUSD</option>
                      <option value="USDCAD">USDCAD</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Panel - Generated Code */}
              <div className="w-1/2 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Generated Code</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={copyCode}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4 h-80 overflow-auto">
                  <pre className="text-sm">
                    <div className="flex">
                      <div className="text-gray-500 pr-4 select-none">
                        {generatedCode.split('\n').map((_, i) => (
                          <div key={i}>{i + 1}</div>
                        ))}
                      </div>
                      <code className="text-gray-300">
                        <span className="text-yellow-400">{'{'}</span>
              
                        <>{'\n  '}<span className="text-blue-400">"current_price"</span><span className="text-white">:</span> <span className="text-green-400">"{{close}}"</span><span className="text-white">,</span></>
                        <>{'\n  '}<span className="text-blue-400">"exit_on_opposite"</span><span className="text-white">:</span> <span className="text-orange-400">0</span></>
                        <>{'\n'}<span className="text-yellow-400">{'}'}</span></>
                      </code>
                    </div>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingViewPage;