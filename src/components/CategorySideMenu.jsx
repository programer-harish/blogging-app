import React, { useState, useEffect } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../services/category-service'
import { Link } from 'react-router-dom'

const CategorySideMenu = () => {

    const [categories, setCategories] = useState([])
    useEffect(() => {
        loadAllCategories().then((response) => {
            setCategories(response)
        }).catch(error => {
            console.log(error)
        })
    }, [])
    return (
        <div>
            <ListGroup>
                <ListGroupItem action={true} className='border 0 shadow-0'
                tag={Link}
                to={'/'}>
                    All Blogs
                </ListGroupItem>
                {
                    categories && (
                        categories.map((category, index) => {
                            return (
                                <ListGroupItem tag={Link} key={index} action={true} className='border 0 shadow-0 mt-1'
                                to={'/categories/'+category.categoryId}
                                >
                                    {category.title}
                                </ListGroupItem>)
                        })
                    )
                }
            </ListGroup>
        </div>
    )
}

export default CategorySideMenu