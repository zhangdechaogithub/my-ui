import Menu from './Menu'
import SubMenu from './SubMenu'
import MenuItem from './MenuItem'
import MenuItemGroup from './MenuItemGroup'
import Divider from './Divider'

Menu.SubMenu = SubMenu
Menu.Item = MenuItem
Menu.Divider = Divider
Menu.ItemGroup = MenuItemGroup


Menu.install = (Vue) => {
    Vue.component(Menu.name, Menu)
    Vue.component(Menu.Item.name, Menu.Item)
    Vue.component(Menu.SubMenu.name, Menu.SubMenu)
    Vue.component(Menu.Divider.name, Menu.Divider)
    Vue.component(Menu.ItemGroup.name, Menu.ItemGroup)
}
export default Menu