# E-commerce Store
Steps of a Project


  
    Install Tools
    Create React App
    List Products
        create products array
        add product images
        render products
        style products
        
    Add page routing
        npm i react-router-dom
        create route for home screen
        create router for product screen
        
    Create Node.JS Server
        run npm init in root folder
        Update package.json set type: module
        Add .js to imports
        npm install express
        create server.js
        add start command as node server/server.js
        require express
        create route for / return server is ready.
        move products.js from client to server
        create route for /api/products
        return products
        run npm start
        
    Fetch Products From Backend
        set proxy in package.json
        npm install axios
        use state hook
        use effect hook
        use reducer hook
        
    Manage State By Reducer Hook
        define reducer
        update fetch data
        get state from usReducer
        
    Add bootstrap UI Framework
        npm install react-bootstrap bootstrap
        update App.js
        
    Create Product and Rating Component
        create Rating component
        Create Product component
        Use Rating component in Product component
        
    Create Product Details Screen
        fetch product from backend
        create 3 columns for image, info and action
        
    Create Loading and Message Component
        create loading component
        use spinner component
        craete message component
        create utils.js to define getError fuction
        
    Create React Context For Add Item To Cart
        Create React Context
        define reducer
        create store provider
        implement add to cart button click handler
        
    Complete Add To Cart
        check exist item in the cart
        check count in stock in backend
        
    Create Cart Screen
        create 2 columns
        display items list
        create action column
        
    Complete Cart Screen
        click handler for inc/dec item
        click handler for remove item
        click handler for checkout
        
    Create Signin Screen
        create sign in form
        add email and password
        add signin button
        
    Connect To MongoDB Database
        create atlas monogodb database
        install local mongodb database
        npm install mongoose
        connect to mongodb database
        
    Seed Sample Products
        create Product model
        create seed route
        use route in server.js
        seed sample product
        
    Seed Sample Users
        create user model
        seed sample users
        
    Create Signin Backend API
        create signin api
        npm install jsonwebtoken
        define generateToken
        
    Complete Signin Screen
        handle submit action
        save token in store and local storage
        show user name in header
        
    Create Shipping Screen
        create form inputs
        handle save shipping address
        add checkout wizard bar
        
    Create Sign Up Screen
        create input forms
        handle submit
        create backend api
        
    Implement Select Payment Method Screen
        create input forms
        handle submit
        
    Create Place Order Screen
        show cart items, payment and address
        calculate order summary
        
    Implement Place Order Action
        handle place order action
        create order create api
        
    Create Order Screen
        create backend api for order/:id
        fetch order api in frontend
        show order information in 2 cloumns
        
    Create Profile Screen
        get user info from context
        show user information
        create user update api
        update user info
        
    Edit User Info
        create edit button and UI
        dispaly user info in the input boxes
        implement backend api
        handle edit click



