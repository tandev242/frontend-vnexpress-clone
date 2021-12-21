import { Sidebar } from "../../components/skeletons/Sidebar";
import { FeatureNewsCard } from "./FeatureNewsCard";
import { Loading } from "../../components/includes/Loading";
import { NewsLetter } from "../../components/includes/NewsLetter";
import NewsListCard from "./NewsListCard";

// Cho nay de data mau khi minh co data duoi db thi sua lai
import HomePageData from "../../data/homePageData";
import SideBarData from "../../data/sideBarData";


export default function index() {
    const { hot_news, trending_new,
        editor_choice, post_catalog_one,
        post_catalog_two } = HomePageData;
    const { popular_news, most_commented } = SideBarData;

    return (
        <>
            <section id="feature_news_section" className="feature_news_section">
                <FeatureNewsCard
                    hot_news={hot_news}
                    trending_new={trending_new}
                    editor_choice={editor_choice}
                />
            </section>
            {/* <!-- Feature News Section --> */}
            <section id="category_section" className="category_section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            {post_catalog_one ? (
                                <NewsListCard
                                    catalogListOne={post_catalog_one}
                                    catalogListTwo={post_catalog_two}
                                />
                            ) : (
                                <Loading />
                            )}
                        </div>

                        <Sidebar
                            popular_news={popular_news}
                            most_commented_news={most_commented}
                        />
                    </div>
                </div>
            </section>
            <NewsLetter />
        </>
    );
}
