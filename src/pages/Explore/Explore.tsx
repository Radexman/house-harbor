import { Link } from 'react-router-dom';
import rentImage from '../../assets/images/interior-2.jpg';
import saleImage from '../../assets/images/house-1.jpg';

function Explore() {
  return (
    <div className="container mx-auto mb-20 p-4">
      <header>
        <h1 className="text-center text-4xl font-semibold md:text-left">Explore</h1>
      </header>
      <main>
        <h2 className="text-xl">Categories</h2>
        <p className="py-2">Choose one of the categories of properites to browse through</p>
        <div className="mx-auto flex flex-col items-center gap-6 md:flex-row">
          <button type="button" className="group w-full md:w-1/2">
            <Link to="/category/rent" className="flex items-center justify-center">
              <div className="relative">
                <img
                  src={rentImage}
                  alt=""
                  className="rounded-2xl brightness-50 transition-all duration-200 group-hover:contrast-125"
                />
                <p className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white md:text-4xl">
                  Properties For Rent
                </p>
              </div>
            </Link>
          </button>
          <button type="button" className="group w-full md:w-1/2">
            <Link to="/category/sale" className="flex items-center justify-center">
              <div className="relative">
                <img
                  src={saleImage}
                  alt=""
                  className="rounded-2xl brightness-50 transition-all duration-200 group-hover:contrast-125"
                />
                <p className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white md:text-4xl">
                  Properties For Sale
                </p>
              </div>
            </Link>
          </button>
        </div>
      </main>
    </div>
  );
}

export default Explore;
