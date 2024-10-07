require('dotenv').config({ path: '.env' });

const links = {
    backendUrl: 'process.env.VITE_PROD_BASE_URL'
}

export default links;