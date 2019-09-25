import Pagination from '../pagination/'

const mixinDemo = {
    methods: {
       getPagination(){
           return <Pagination total={50} current={12}/>
       }
    }
}

export default mixinDemo