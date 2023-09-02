import React, { useState } from "react";

export default function Popover( { children } ) {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      content={<a onClick={hide}>Close</a>}
      title="Title"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      {children}
    </Popover>
  );
}
