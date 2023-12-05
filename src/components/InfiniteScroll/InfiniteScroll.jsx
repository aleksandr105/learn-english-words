import React, { useState, useEffect } from "react";

export const InfiniteScroll = ({
  data,
  fetchDataFunc,
  limit,
  children,
  page,
}) => {
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const link = document.querySelector("#modal-root").querySelector("ul");

    const handleScroll = () => {
      if (link.scrollHeight - link.scrollTop <= link.clientHeight) {
        setHasMore(true);
      }
    };

    link.addEventListener("scroll", handleScroll);

    return () => link.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!hasMore) return;
    if (data.total === data.data.length) {
      setHasMore(false);
      return;
    }

    setHasMore(false);

    fetchDataFunc({ page: page + 1, limit, words: data });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore]);

  return <>{children}</>;
};
