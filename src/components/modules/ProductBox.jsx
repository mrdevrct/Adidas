import React from "react";
import { Link } from "react-router-dom";

export default function ProductBox(props) {
  return (
    <>
      <Link to={`/product/${props.name}`}>
        <div className="group relative">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
              src={props.imgSrc}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <span className="absolute bottom-0">{props.name}</span>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{props.color}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">
              ${props.price}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
