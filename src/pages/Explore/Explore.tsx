import { Link } from 'react-router-dom';
import rentImage from '../../assets/images/interior-2.jpg';
import saleImage from '../../assets/images/house-1.jpg';

function Explore() {
  return (
    <div className="container mx-auto p-4">
      <header>
        <h1 className="text-center text-4xl font-semibold md:text-left">Explore</h1>
      </header>
      <main>
        <h2 className="text-xl">Categories</h2>
        <div className="mx-auto flex max-w-md items-center gap-3">
          <button type="button" className="group w-1/2">
            <Link to="/category/rent" className="flex items-center justify-center">
              <div className="relative">
                <img src={rentImage} alt="" className="rounded-lg transition-all duration-200 group-hover:grayscale" />
                <p className="absolute inset-0 flex items-center justify-center text-xl font-bold text-black ">
                  Properties For Rent
                </p>
              </div>
            </Link>
          </button>
          <button type="button" className="w-1/2">
            <Link to="/category/sale" className="flex items-center justify-center">
              <div className="relative">
                <img src={saleImage} alt="" />
                <p className="absolute inset-0 flex items-center justify-center text-white">Properties For Sale</p>
              </div>
            </Link>
          </button>
        </div>
      </main>
    </div>
  );
}

export default Explore;
