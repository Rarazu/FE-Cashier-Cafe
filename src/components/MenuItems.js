const signOut = () => {
    localStorage.removeItem(`token-kasir`)
    localStorage.removeItem(`user-kasir`)
    localStorage.removeItem(`role`)
}

export const MenuItems = [
    // {
    //     title : "Home",
    //     path : "/",
    //     cName : "nav-links",
    //     icon : "fa-solid fa-house-user"
    // },
    {
        title : "Order",
        path : "/order",
        cName : "nav-links",
        icon : "fa-solid fa-basket-shopping"
    },
    {
        title : "Menu",
        path : "/menu",
        cName : "nav-links",
        icon : "fa-solid fa-book"
    },
    {
        title : "Table",
        path : "/table",
        cName : "nav-links",
        icon : "fa-solid fa-plate-wheat"
    },
    {
        title : "User",
        path : "/user",
        cName : "nav-links",
        icon : "fa-solid fa-user"
    },
    {
        title : "Sign out",
        path : "/signin",
        cName : "nav-links",
        onClick: () => signOut()
    }
]