import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faNewspaper,
  faHeart,
  faMessage,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

// Services
import findDateDistanceStrict from "@services/dates/findDateDistanceStrict";
import findUser from "@services/users/findUser";
import findArticlesView from "@services/articles/findArticlesView";
import findArticlesComment from "@services/articles/findArticlesComment";
import findArticlesLike from "@services/articles/findArticlesLike";

import Header from "../../components/admin/Header";
import NavLeft from "../../components/admin/NavLeft";
import PageTitle from "../../components/admin/PageTitle";
import nopicture from "../../assets/images/nopicture.png";

export default function Articles() {
  const [articlesList, setArticlesListe] = useState([]);

  const formatDate = (date) => {
    return `${new Date(date)
      .toLocaleDateString("fr-FR")
      .split("/")
      .reverse()
      .join("-")} ${new Date(date).toLocaleTimeString("fr-FR")}`;
  };

  useEffect(() => {
    fetch(`http://localhost:5000/publication/browse`)
      .then((response) => response.json())
      .then((data) => {
        setArticlesListe(data);
      });
  }, []);

  return (
    <div className="admin">
      <NavLeft elemActive="articles" />
      <main>
        <Header />
        <div className="content">
          <PageTitle title="Articles" icon={faNewspaper} />

          <section className="articles_list flex gap-5 flex-wrap">
            {articlesList.map((e) => (
              <Link className="w-1/4" to={`/admin/articles/${e.id}`}>
                <div className=" articles_list_card p-5">
                  <div className="mb-5 flex items-center">
                    <div>
                      <img className="w-12 mr-4" src={nopicture} alt="member" />
                    </div>
                    <div>
                      <div className="text-xl font-bold">{`${
                        findUser(e.user_id).firstName
                      } ${findUser(e.user_id).lastName}`}</div>
                      <div className="text-sm italic text-zinc-400">
                        {e.groupe}
                      </div>
                      <div className="text-sm text-zinc-400">
                        {findDateDistanceStrict(formatDate(e.date))}
                      </div>
                    </div>
                  </div>
                  <div>{e.text}</div>
                  <div className="articles_list_card_footer flex justify-between pt-2 mt-5 pl-2 pr-2">
                    <div>
                      <FontAwesomeIcon className="text-blue-400" icon={faEye} />
                      <span className="ml-2">
                        {findArticlesView(e.id).length}
                      </span>
                    </div>
                    <div>
                      <FontAwesomeIcon
                        className="text-red-500"
                        icon={faHeart}
                      />
                      <span className="ml-2">
                        {findArticlesLike(e.id).length}
                      </span>
                    </div>
                    <div>
                      <FontAwesomeIcon
                        className="text-zinc-400"
                        icon={faMessage}
                      />
                      <span className="ml-2">
                        {findArticlesComment(e.id).length}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
