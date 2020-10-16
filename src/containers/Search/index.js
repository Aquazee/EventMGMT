import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
//var mySlider = $("input.slider").slider();
// Call a method on the slider
//var value = mySlider.slider('getValue');

// For non-getter methods, you can chain together commands
// mySlider
//     .slider('setValue', 5)
//     .slider('setValue', 7);
// Call a method on the slider
//var value = mySlider.slider('getValue');

import './style.css'
const ProcessorBrand = ["Intel", "Amd"];
const Processor = ["Core i5", "Core i7", "Core i9", "Core m3"];
const Brand = ["Apple", "Microsoft", "Dell", "Asus"];
const Os = ["Windows", "Mac Os", "Linux", "Fedora"];
const Ram = ["4", "8", "16", "Integrated"];
const Graphics = ["4", "8", "16", "Integrated"];
const Type = ["Thin and Light Laptop", "Laptop"];
const Offers = ["Bank Offer", "Exchange Offer", "No Cost EMI", "Special Price"];
const CustomerRatings = ["1", "2", "3", "4", "5"];
const Search = () => (
    <div className="col-12" >
        <div className="" style={{ background: "#e0e0e0", padding: 10 }}>
            <div className="row" >
                <div className="col-3">
                    <div id="filter" className="filter_Sect">
                        <ul className="">
                            <li className="filter_title pddh-15">
                                Filters
                            </li>
                            <li className="text-uppercase " data-toggle="collapse" href="#ProcessorBrand" role="button" aria-expanded="false" aria-controls="collapseExample">Processor</li>
                            <div className="collapse" id="ProcessorBrand">
                                {ProcessorBrand.map((i) => {
                                    return <div key={i} className="form-check">
                                        <input type="checkbox" className="form-check-input" id={"ProcessorBrand" + i} value={i} />
                                <label className="form-check-label" htmlFor={"ProcessorBrand" + i}>{i}</label>
                                    </div>
                                })}
                            </div>
                            <li className="text-uppercase" data-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample1">Price
                            <div className="collapse filter_divs font-weight-normal" id="collapseExample1">
                                    <div data-role="main" className="ui-content">
                                        <form method="post" action="/action_page_post.php">
                                            <input
                                                type="text"
                                                name="somename"
                                                data-provide="slider"
                                                data-slider-ticks="[1, 2, 3]"
                                                data-slider-ticks-labels='["short", "medium", "long"]'
                                                data-slider-min="1"
                                                data-slider-max="3"
                                                data-slider-step="1"
                                                data-slider-value="3"
                                                data-slider-tooltip="hide"
                                            />
                                            <input type="submit" data-inline="true" value="Submit" />
                                        </form>
                                    </div>
                                </div>
                            </li>


                            <li className="text-uppercase " data-toggle="collapse" href="#Processor" role="button" aria-expanded="false" aria-controls="Processor">Processor</li>
                            <div className="collapse font-weight-normal" id="Processor">
                                {Processor.map((i) => {
                                    return <div key={i} className="form-check">
                                        <input type="checkbox" className="form-check-input" id={"Processor" + i} value={i} />
                                <label className="form-check-label" htmlFor={"Processor" + i}>{i}</label>
                                    </div>
                                })}
                            </div>
                            <li className="text-uppercase " data-toggle="collapse" href="#Brand" role="button" aria-expanded="false" aria-controls="Brand">Brand</li>
                            <div className="collapse font-weight-normal" id="Brand">
                                {Brand.map((i) => {
                                    return <div key={i} className="form-check">
                                        <input type="checkbox" className="form-check-input" id={"Brand" + i} value={i} />
                                <label className="form-check-label" htmlFor={"Brand" + i}>{i}</label>
                                    </div>
                                })}
                            </div>
                            <li className="text-uppercase " data-toggle="collapse" href="#Os" role="button" aria-expanded="false" aria-controls="Os">Operating System</li>
                            <div className="collapse font-weight-normal" id="Os">
                                {Os.map((i) => {
                                    return <div key={i} className="form-check">
                                        <input type="checkbox" className="form-check-input" id={"Os" + i} value={i} />
                                        <label className="form-check-label" htmlFor={"Os" + i}>{i}</label>
                                    </div>
                                })}
                            </div>
                            <li className="text-uppercase " data-toggle="collapse" href="#Ram" role="button" aria-expanded="false" aria-controls="Ram">Ram</li>
                            <div className="collapse font-weight-normal" id="Ram">
                                {Ram.map((i) => {
                                    return <div key={i} className="form-check">
                                        <input type="checkbox" className="form-check-input" id={"Ram" + i} value={i} />
                                <label className="form-check-label" htmlFor={"Ram" + i}>{i}</label>
                                    </div>
                                })}
                            </div>
                        </ul>
                    </div>
                </div>
                <div className="col-9 productList" style={{ padding: 0 }}>
                    <nav className="pddh-15" style={{ marginTop: 15 }}>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a className="text-grey" href="/">Home</a></li>
                            <li className="breadcrumb-item"><a className="text-grey" href="#">Computers</a></li>
                            <li className="breadcrumb-item text-grey">Laptops</li>
                        </ol>
                    </nav>
                    <div>
                        <h5 className="pddh-15">Top Budget Laptops <small>(Showing 1 – 8 products of 8 products)</small></h5>
                        <div className="row">
                            <div className="col-12">
                                <div className="mt-3 ">
                                    <div className="tab-card-header">
                                        <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link disabled text-dark" href="#">Sort By</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="one-tab" data-toggle="tab" href="#one" role="tab" aria-controls="One" aria-selected="true">Popularity</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="two-tab" data-toggle="tab" href="#two" role="tab" aria-controls="Two" aria-selected="false">Price -- Low to High</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="three-tab" data-toggle="tab" href="#three" role="tab" aria-controls="Three" aria-selected="false">Price -- High to Low</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="three-tab" data-toggle="tab" href="#three" role="tab" aria-controls="Three" aria-selected="false">Newest First</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active p-3" id="one" role="tabpanel" aria-labelledby="one-tab">
                                            <a href="/product" className="row btn-link text-left">
                                                <div className="col-3 position-relative">
                                                    <img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1565713229/single_4.jpg" alt="" width="100%" />
                                                    <span href="#" className="btn-link prt_heart"><i className="fa fa-heart" aria-hidden="true" style={{ color: "#c2c2c2" }}></i></span>
                                                    <div className="form-check prt_compare">
                                                        <input type="checkbox" className="form-check-input" id="addCompare" />
                                                        <label className="form-check-label text-black" htmlFor="addCompare">Add to Compare</label>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="pull-left prt_label">
                                                        <span className="">HP 15s Core i3 10th Gen - (8 GB/1 TB HDD/Windows 10 Home) 15s-du2071TU Thin and Light Laptop</span>
                                                        <div className="text-left"><span className="badge badge-success"> 4.5 <i className="fa fa-star"></i></span> <span className="rating-review"> 35 Ratings & 45 Reviews</span></div>
                                                    </div>
                                                    <div className="pull-left">
                                                        <ul style={{ marginLeft: 14, marginTop: 11 }}>
                                                            <li className="li-disc">Stylish & Portable Thin and Light Laptop </li>
                                                            <li className="li-disc">13.3 inch Quad HD LED Backlit IPS Display</li>
                                                            <li className="li-disc">Light Laptop without Optical Disk Drive</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <span className="product_price" style={{ fontSize: 25, color: "#333", margin: 0 }}>₹29,000</span><br />
                                                    <span className="text-left">
                                                        <strike className="product_discount m-0">
                                                            <span style={{ color: '#878787', fontSize: 15 }}>₹ 2,000</span>
                                                        </strike>
                                                        <span style={{ color: '#388e3c', fontSize: 14, marginLeft: 10 }}>12% off</span>
                                                    </span><br />
                                                    <span style={{ fontSize: 14, color: "#333" }}>No Cost EMI</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

)

Search.propTypes = {

};

export default Search;