import { useEffect, useState } from "react"
import apiRequest from "../../../services/Axios/config"
import { Link } from "react-router-dom"

export default function Example() {
  const [categories , setCategories] = useState([])
  useEffect(()=>{
    apiRequest.get('/categories')
    .then((response)=>{
      const categoryData = response.data
      if (categories) {
        setCategories(categoryData)
      } else {
        console.log(ErrorMessage);
      }
    })
  },[])

  const clickHandler = (value)=>{
    console.log(value);
  }

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-40">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
            {categories.map((category) => (
              <Link to={`/products/${category.name}`} key={category.id}>
              <div key={category.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-60">
                  <img
                    src={category.img}
                    className="h-fit w-fit object-cover object-center"
                    onClick={() => clickHandler(category.name)}
                  />
                </div>
                <h3 className="mt-6  text-[25px] text-gray-500">
                  <a href={category.href}>
                    <span className="absolute inset-0" />
                    {category.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-[15px] text-gray-900">{category.description}</p>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
