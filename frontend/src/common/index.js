const backendDomain = process.env.REACT_APP_BACKEND_ULL //"http://localhost:8080";

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },

  
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },

  
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },

  user_logout: {
    url: `${backendDomain}/api/userlogout`,
    method: "get",
  },

  all_users: {
    url: `${backendDomain}/api/all-user`,
    method: "get",
  },

  update_users: {
    url: `${backendDomain}/api/update-user`,
    method: "post",
  },

  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: "post",
  },

  allproduct: {
    url: `${backendDomain}/api/get-product`,
    method: "get",
  },
  
  
    categoryProduct: {
      url: `${backendDomain}/api/get-category`,
      method: "get",
    },
  
    categoryWiseProduct: {
      url: `${backendDomain}/api/category-product`,
      method: "post",
    },
  
    producDetails: {
      url: `${backendDomain}/api/product-details`,
      method: "post",
    },
  
    addToCartProduct: {
      url: `${backendDomain}/api/addtocart`,
      method: "post",
    },
  
  
    cartProductCount: {
      url: `${backendDomain}/api/countAddToCartProduct`,
      method: "get",
    },
  
    cartProductView: {
      url: `${backendDomain}/api/view-cart-product`,
      method: "get",
    },
  
    cartProductUpdate: {
      url: `${backendDomain}/api/update-cart-product`,
      method: "post",
    },

    cartProductDelete: {
      url: `${backendDomain}/api/delete-cart-product`,
      method: "post",
    },
  
    searchProduct: {
      url: `${backendDomain}/api/search`,
      method: "get",
    },
  
  
    filterProduct: {
      url: `${backendDomain}/api/filter-product`,
      method: "post",
    },
  
    payment: {
      url: `${backendDomain}/api/checkout`,
      method: "post",
    },
  
    orderList: {
      url: `${backendDomain}/api/order-list`,
      method: "get",
    },
  
    allOrderList: {
      url: `${backendDomain}/api/all-orders`,
      method: "get",
    },
  
};

export default SummaryApi;
