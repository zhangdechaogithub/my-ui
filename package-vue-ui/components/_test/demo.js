import Pagination from '../pagination/'

const mixinDemo = {
    methods: {
       getPagination(){
           return <Pagination 
                    total={500} 
                    current={12} 
                    showQuickJumper 
                    pageSizeOptions={[10, 20, 30, 40]}
                    showTotal
                    showSizeChanger
                    changeFunc={(page, size, total) => {
                        console.log({page,size, total})
                    }}
                    simple
                />
       }
    }
}

export default mixinDemo