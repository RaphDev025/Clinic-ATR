    import React, { useState, useEffect } from 'react'
    import { SliderCard } from 'Components'
    import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs'
    import Slider from 'react-slick'
    import 'slick-carousel/slick/slick.css';
    import 'slick-carousel/slick/slick-theme.css';

const Testimonials = ({contents}) => { 
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
        setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    const settings = {
        dots: false,
        speed: 500,
        arrows: true,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow:  windowWidth <= 767 ? 1 : 3,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    }
    return (
        <div className='container p-0'>
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