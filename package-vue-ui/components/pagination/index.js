import './style/index.scss'
import Pagination from './Pagination'

Pagination.install = (Vue) => {
   Vue.component(Pagination.name, Pagination)
}
export default Pagination