import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import { databases, storage } from '../appwriteConfig';
import { useUser } from '../components/userContext';
const order_id= "6740474900354338e949"
import { Query } from 'appwrite';
const BUCKET_ID = '6742e69c003e3ca0399e';

const OrderHistoryPage = () => {
  const { user,setUser} = useUser();
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);

  const OrderCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
    <div className="h-3 bg-gray-200 rounded w-1/4 mb-6"></div>
    <div className="flex space-x-2 mb-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-12 h-12 bg-gray-200 rounded-md"></div>
      ))}
    </div>
    <div className="h-8 bg-gray-200 rounded w-24 ml-auto"></div>
  </div>
);

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };
  const closeOrderDetails = () => {
    setSelectedOrder(null);
    setShowOrderDetails(false);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
//   const { user,setUser} = useUser();
 useEffect(() => {
  if (!user || !user.email) return;

  const fetchData = async () => {
    try {
      const db = await databases.listDocuments(
        order_id,
        "6742d9eb00270c32b419",
        [
          Query.equal("email", user.email),
          Query.equal("type", "order")
        ]
      );
      let items = db.documents;
      setOrders(items.map((item) => {
        let items_2 = JSON.parse(item.order);
        console.log(items_2, 'details')
        // console.log(files, 'filess')
        if (files.length) {
  items_2.forEach((item) => {
    const matchedFile = files.find((file) =>
      file.name.toLowerCase().includes(item.name.toLowerCase())
    );
    if (matchedFile) {
      item.image = `https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${matchedFile.$id}/view?project=673ebe09000b35b67d8b&mode=admin`;
    } else {
      item.image = "/placeholder.png"; // fallback if no match
    }
  });
}

        let total = items_2.reduce((c, a) => c + Number(a.price), 0);
        // console.log(items_2)
        return {
          id: item.$id,
          date: item.date,
          total,
          status: item.status,
          item: items_2
        };
      }));
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

 
   const fetchFiles = async () => {
      try {
        const response = await storage.listFiles(BUCKET_ID);
        // console.log(response, 'respinse')
        setFiles(response.files);
        //   console.log(files)
      } catch (error) {
        console.error('Error listing files:', error);
      } finally {
        // setLoading(false);
      }
    };
    fetchFiles();
     setTimeout(()=>{
        fetchData();
     },1500)


}, [user, files.length]);


  return (
    <>
    <Header></Header>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">History</h1>
        {/* <button 
          onClick={toggleEmptyState}
          className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 cursor-pointer !rounded-button whitespace-nowrap"
        >
          {showEmptyState ? 'Show Orders' : 'Show Empty State'}
        </button> */}
        <div className="mt-4 ">
              <div className="flex space-x-2">
                <button className="!rounded-button whitespace-nowrap cursor-pointer bg-[#2C5530] text-white py-2 px-4 rounded-full text-sm font-medium ">Orders</button>
                <button className="!rounded-button whitespace-nowrap cursor-pointer bg-[#F5F7F6] text-gray-700 py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">Delivery</button>
                <button className="!rounded-button whitespace-nowrap cursor-pointer bg-[#F5F7F6] text-gray-700 py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">Rides</button>
              </div>
            </div>
      </div>

     <div className="space-y-6">
        {loading ? (
    <>
      <OrderCardSkeleton />
      <OrderCardSkeleton />
      <OrderCardSkeleton />
    </>
  ) :<>
            {orders.map((order, index) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Order-num-089{index}</h3>
                      <p className="text-sm text-gray-500">{order.date.split(",")[0]}</p>
                    </div>
                    <div className="mt-2 sm:mt-0 flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center mt-4 mb-6">
                    <div className="mr-6">
                      <span className="text-sm text-gray-500">Total</span>
                      <p className="text-lg font-medium text-gray-900">{order.total}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                      {order.item.map((item, index) => (
                        index < 3 && (
                          <div key={item.id} className="relative group">
                            <div className="w-12 h-12 rounded-md overflow-hidden">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              {item.name}
                            </div>
                          </div>
                        )
                      ))}
                      {order.item.length > 3 && (
                        <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">+{order.items.length - 3}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button 
                      onClick={() => openOrderDetails(order)}
                      className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer !rounded-button whitespace-nowrap"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </>
        }
          </div>

      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                <p className="text-sm text-gray-500">{selectedOrder.id} • {selectedOrder.date}</p>
              </div>
              <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
              </div>
              <button 
                onClick={closeOrderDetails}
                className="text-gray-400 hover:text-gray-500 cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-130px)]">
              <div className="space-y-6">
                {selectedOrder.item.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 py-4 border-b border-gray-100">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                      <div className="flex justify-between mt-2">
                        <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
                        <div className="text-sm font-medium text-gray-900">Rs{item.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="text-base font-medium text-gray-900">Order Total</div>
                <div className="text-xl font-bold text-gray-900">Rs{selectedOrder.total}</div>
              </div>
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={closeOrderDetails}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 mr-3 cursor-pointer !rounded-button whitespace-nowrap"
                >
                  Close
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 cursor-pointer !rounded-button whitespace-nowrap">
                  Track Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
    <Footer></Footer>
    </>
  );
};

export default OrderHistoryPage;
