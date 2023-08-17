import React, { useEffect, useRef } from "react";

export const OptionsModal = ({ closeModal, children, style }) => {
  const wrapperRef = useRef();

  useEffect(() => {
    const closeOptions = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target))
        closeModal();
    };

    window.addEventListener("click", closeOptions);

    return () => {
      window.removeEventListener("click", closeOptions);
    };
  }, [closeModal]);

  return (
    <div ref={wrapperRef} style={style}>
      {children}
    </div>
  );
};
