import React from 'react'
import { SliderCard } from 'Components'
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Testimonials = ({contents}) => { 
    const settings = {
        dots: false,
        speed: 500,
        arrows: true,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 3,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    }
    return (
        <div className='container'>
            <Slider {...settings}>
            {contents.map((content, indx) => (
                <SliderCard key={indx} data={content}/>
            ))}
            </Slider>
        </div>
    ) 
}

function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
        <BsArrowRightCircleFill className={`${className} text-success`} onClick={onClick} />
    );
}

function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
        <BsArrowLeftCircleFill className={`${className} text-success`} onClick={onClick} />
    );
}

export default Testimonials