import React from 'react'
import { SearchOutlined } from '@ant-design/icons'

export default function SearchBar() {
    return (
        <form action='#' className='mainSearch'>
            <SearchOutlined className='searchIcon' />
            <input type='text' placeholder={`search`} />
        </form>
    )
}
