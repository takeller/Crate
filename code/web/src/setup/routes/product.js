// App Imports
import Detail from '../../modules/product/Detail'
// Adds unique routing based on which product is selected
// Product routes
export default {
  product: {
    path: (slug = ':slug') => (`/product/${ slug }`),
    component: Detail
  }
}
