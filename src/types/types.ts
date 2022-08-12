
export interface ItemTable {
    _id: string
    category: string
    subcategory: string
    title: string
}
export interface Item {
    _id: string
    category: string
    subcategory: string
    title: string
    text: string
}

export interface Category {
    _id: string,
    path: string,
}

export interface CategoryModified extends Category {
    pathArray: string[]
}
