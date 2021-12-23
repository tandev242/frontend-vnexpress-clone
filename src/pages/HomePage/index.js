import { Sidebar } from "../../components/skeletons/Sidebar";
import { FeatureNewsCard } from "./FeatureNewsCard";
import { Loading } from "../../components/includes/Loading";
import { NewsLetter } from "../../components/includes/NewsLetter";
import NewsListCard from "./NewsListCard";
import { useSelector, useDispatch } from "react-redux";

export default function Index() {
    const { lastPosts } = useSelector(state => state.post);
    const catalogListOne = lastPosts.slice(3, 7)
    const catalogListTwo = lastPosts.slice(7, 10)
    const catalogListThree = lastPosts.slice(10, 14)
    const catalogListFour = lastPosts.slice(14, 17)

    return (
        <>
            <section id="feature_news_section" className="feature_news_section">
                <FeatureNewsCard
                    hotNews={lastPosts[0]}
                    trendingNews={lastPosts[1]}
                    editorChoice={lastPosts[2]}
                />
            </section>
            {/* <!-- Feature News Section --> */}
            <section id="category_section" className="category_section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            {catalogListOne ? (
                                <NewsListCard
                                    catalogListOne={catalogListOne}
                                    catalogListTwo={catalogListTwo}
                                    catalogListThree={catalogListThree}
                                    catalogListFour={catalogListFour}
                                />
                            ) : (
                                <Loading />
                            )}
                        </div>

                        <Sidebar />
                    </div>
                </div>
            </section>
            <NewsLetter />
        </>
    );
}
