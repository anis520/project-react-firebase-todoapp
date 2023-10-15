import { useState } from "react";
import communitylogo from "../assets/community.gif";
import avatar from "../assets/placeholderAvatar.png";
import { Helmet } from "react-helmet";
const Group = () => {
  const [group, setgroup] = useState(10);
  return (
    <>
      {group ? (
        <>
          {" "}
          <Helmet>
            <meta charSet="utf-8" />
            <title>Community</title>
            <link rel="canonical" href="http://mysite.com/example" />
          </Helmet>
          <div className="h-screen w-full bg-indigo-300">
            <p className="  h-10 bg-white m-4  text-2xl text-center font-semibold rounded-md">
              Communitys
            </p>

            <div className="grid md:grid-cols-2 ">
              {/* single groups */}
              <div className="bg-white m-4 hover:bg-gray-200  duration-300   text-center font-semibold cursor-pointer rounded-md py-5  ">
                <div className="flex  p-1 gap-4  divide-x items-center justify-between">
                  <p className="px-2">Team emargancy</p>
                  <p className="px-2">
                    Members{" "}
                    <span className="bg-indigo-400 text-white px-1 rounded-full ">
                      12
                    </span>
                  </p>
                  <div className=" flex px-3">
                    <img
                      src={avatar}
                      alt="users"
                      className="w-8 h-8 rounded-full border"
                    />
                    <img
                      src={avatar}
                      alt="users"
                      className="w-8 h-8 rounded-full border"
                    />
                    <img
                      src={avatar}
                      alt="users"
                      className="w-8 h-8 rounded-full border"
                    />
                  </div>
                </div>
              </div>
              {/* single groups */}
              {/* single groups */}
              <div className="bg-white m-4  hover:bg-gray-200  duration-300   text-center font-semibold cursor-pointer rounded-md py-5  ">
                <div className="flex  p-1 gap-4  divide-x items-center justify-between">
                  <p className="px-2">Team emargancy</p>
                  <p className="px-2">
                    Members{" "}
                    <span className="bg-indigo-400 text-white px-1 rounded-full ">
                      12
                    </span>
                  </p>
                  <div className=" flex px-3">
                    <img
                      src={avatar}
                      alt="users"
                      className="w-8 h-8 rounded-full border"
                    />
                    <img
                      src={avatar}
                      alt="users"
                      className="w-8 h-8 rounded-full border"
                    />
                    <img
                      src={avatar}
                      alt="users"
                      className="w-8 h-8 rounded-full border"
                    />
                  </div>
                </div>
              </div>
              {/* single groups */}{" "}
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <Helmet>
            <meta charSet="utf-8" />
            <title>Community</title>
            <link rel="canonical" href="http://mysite.com/example" />
          </Helmet>
          <div className="bg-indigo-400 w-full h-screen flex flex-col gap-3 items-center justify-center  ">
            <img
              src={communitylogo}
              className="rounded-md w-6/12"
              alt="home page"
            />
            <p className="font-semibold text-indigo-400 text-xl bg-white  px-2 rounded-md cursor-pointer">
              Crate a community
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Group;
