import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { NewsCard } from "../components/skeletons/NewsCard";
import { Sidebar } from "../components/skeletons/Sidebar";
import { Loading } from "../components/includes/Loading";


import SideBarData from "../data/sideBarData";


export default function CategoryPage() {
    const { popular_news, most_commented } = SideBarData;
    const isLoading = false;
    const category = {
        name: "Thoi su trong ngay",
        news: [
            {
                title: 'Tokina to launch three f/1.4 lenses for Sony E mount in November',
                slug: 'tokina-to-launch-three-f14-lenses-for-sony-e-mount-in-november',
                description: 'It looks like Tokina could be launching three new lenses for Sony FE mount cameras on 12 November. The Tokina ATX-M f/1.4 23mm, 33mm and 56mm are already available for Fujifilm X mount cameras, so this should come as welcome news for Sony shooters looking for a set of affordable primes. \r\n\r\nIf this super-fast set of primes for the best Sony cameras are anything like the Fujifilm variants (which we expect they will be, as they just have a different mount) we can expect them to have an aperture range of f/1.4-16, making them perfect for low light photography. They should also include a multi-layer lens coating to suppress light flares and ghosting, and have a de-clickable aperture ring for silent, smooth transitions when using the lens for video.',
                timestamp: '2021-10-24T10:38:24.303832Z',
                author: 1,
                author__user__username: 'sany',
                thumbnail: '',
                thumbnail_url: 'https://cdn.mos.cms.futurecdn.net/bCLUYGnfS2CDFyNq5W4hmb-1024-80.jpg.webp'
            },
            {
                title: 'Sony A7 IV finally revealed, with leaps in resolution, video and burst shooting',
                slug: 'sony-a7-iv-finally-revealed-with-leaps-in-resolution-video-and-burst-shooting',
                description: 'Sony has finally announced its replacement for the Sony A7 III, its affordable do-it-all full frame mirrorless camera, launched back in 2018. The Sony A7 III still holds up very well, even today, but the A7 IV is more advanced in just about every way.\r\n\r\n\r\nThe Sony A7 IV carries on the same tradition as the A7 III, combining 4K video capture with high-speed 10fps continuous shooting, but adds in a 36% increase in resolution, up from 24.2MP to 33MP.\r\n\r\n\r\nThis should allay any misgivings amongst full frame camera buyers that the A7 III’s 24MP might not be enough – that resolution is, after all, the same as many far cheaper APS-C mirrorless cameras. With 33 million pixels, though, the A7 IV establishes a clear gap to lesser APS-C rivals.',
                timestamp: '2021-10-24T09:42:14.391309Z',
                author: 1,
                author__user__username: 'sany',
                thumbnail: '',
                thumbnail_url: 'https://cdn.mos.cms.futurecdn.net/n3FJXWB3yyyDRKvAPyf6jK-1024-80.jpg'
            },
            {
                title: 'GoPro Hero 10 Black: what we want to see from GoPro\'s next flagship',
                slug: 'gopro-hero-10-black-what-we-want-to-see-from-gopros-next-flagship',
                description: 'We\'re quickly approaching the time of year when GoPro traditionally launches a new flagship action camera. And while GoPro Hero 10 Black rumors are thin on the ground right now, it\'s surely preparing something special for the tenth edition of its Hero range.\r\n\r\nAt least, that\'s what we\'re hoping. After all, despite some strong competition from rivals like the DJI Osmo Action and Insta360 One R, the main line GoPros still tend to deliver a best-in-class combination of usability, image quality and stabilization. \r\n\r\nThe big improvements in last year’s GoPro Hero 9 Black included a higher resolution sensor, a longer battery life and a front screen for on-the-fly framing. It\'s the most vlogging-friendly camera GoPro has made so far. \r\n\r\nBut GoPro can do better in 2021. In this article we’ll look at what we think GoPro will bring to the Hero 10 Black, plus some features that are suggested commonly online that we don’t think will happen, and why. \r\n\r\nGoPro Hero 10 Black release date and price\r\n\r\nGoPro has announced a new Black-series flagship action cam in late September or early October every year since the Hero 5 Black landed in 2016. Given this was not pushed back in 2020, despite the pandemic, we\'re expecting GoPro to keep the same launch window in 2021. \r\n\r\nThere are currently no Hero 10 Black pricing leaks, but we don’t expect to see a big change from the Hero 9 Black’s original $449.99/£429.99/AU$699.95 pricing. However, if the new camera launches at the same price this may feel like a hike, as GoPro dropped the price of the Hero 9 Black slightly in January 2021. \r\n\r\nHere are some of the changes we may see to justify the upgrade.',
                timestamp: '2021-07-13T15:38:24.075035Z',
                author: 1,
                author__user__username: 'sany',
                thumbnail: '',
                thumbnail_url: 'https://cdn.mos.cms.futurecdn.net/CxGGCgV9iqYVeaYdCA4HMe-1200-80.jpg'
            },
            {
                title: 'This $600 camera can take photos without a lens attached.',
                slug: 'this-600-camera-can-take-photos-without-a-lens-attached',
                description: 'Chinese manufacturer Yongnuo has released a mirrorless camera that can take photographs even without a lens attached. \r\n\r\nThe Yongnuo YN455 is the company\'s latest Frankenstein camera that is powered by an Android operating system and features a Micro Four Thirds sensor and lens mount (following the Yongnuo YN450, which had a Micro Four Thirds sensor but bizarrely featured a Canon EF/S mount).',
                timestamp: '2021-07-13T15:25:33.887370Z',
                author: 1,
                author__user__username: 'sany',
                thumbnail: '',
                thumbnail_url: 'https://m.media-amazon.com/images/I/91EXNNOk6HL._AC_UY327_QL65_.jpg'
            }
        ],
        slug: "thoi-su-trong-ngay"
    }


    if (isLoading === true) {
        return <Loading />;
    }

    return (
        <Fragment>
            <section class="breadcrumb_section">
                <div class="container">
                    <div class="row">
                        <ol class="breadcrumb">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li class="active">
                                {category && category.name}
                            </li>
                        </ol>
                    </div>
                </div>
            </section>
            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <div class="entity_title header_purple">
                            <h1>
                                <a href="" target="_blank">
                                    {category && category.name}
                                </a>
                            </h1>
                        </div>
                        <div class="row">
                            {category &&
                                category.news.map((news, index) => {
                                    return (
                                        <NewsCard
                                            news={news}
                                            index={index}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                    {popular_news && (
                        <Sidebar
                            popular_news={popular_news}
                            most_commented_news={
                                most_commented
                            }
                        />
                    )}
                </div>
            </div>
            ;
        </Fragment>
    );
}