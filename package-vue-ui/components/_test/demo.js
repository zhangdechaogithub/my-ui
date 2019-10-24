import Menu from '../menu/'
import Icon from '../icon'
const Divider = Menu.Divider
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

import Tooltip from '../tooltip/'

const mixinDemo = {
    methods: {
       getToolTip(){
         return (
             <Tooltip trigger="hover" visibleChange={()=>console.log('ok')} visible={true}>
               <input type="text" />
             </Tooltip>
          )
       },
       getMenu(){
           const clickHandler = ()=>console.log('hello click')
           return (
               <div>
                   <Menu onClickFunc={clickHandler} selectedKeys={['mail']} mode="horizontal">
                       <MenuItem itemKey="mail">
                           <Icon type="mail" />
                           Navigation One
                       </MenuItem>
                       <MenuItem itemKey="app" disabled>
                           <Icon type="appstore" />
                           Navigation Two
                       </MenuItem>
                       <SubMenu
                          title={
                            <span className="submenu-title-wrapper">
                              <Icon type="setting" />
                              Navigation Three - Submenu
                            </span>
                          }
                        >
                             <MenuItemGroup title="group1">
                                 <MenuItem itemKey="setting:1">
                                     Option 1
                                 </MenuItem>
                                 <MenuItem itemKey="setting:2">
                                     Option 2
                                 </MenuItem>
                             </MenuItemGroup>
                             <MenuItemGroup title="group2">
                                 <MenuItem itemKey="setting:3">
                                     Option 3
                                 </MenuItem>
                                 <MenuItem itemKey="setting:4">
                                     Option 4
                                 </MenuItem>
                             </MenuItemGroup>
                        </SubMenu>
                        <MenuItem itemKey="alipay">
                            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                                Navigation Four - Link
                            </a>
                        </MenuItem>
                   </Menu>
               </div>
            )
       }
    }
}

export default mixinDemo