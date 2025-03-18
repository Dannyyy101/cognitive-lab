export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <section className="w-2/3 flex border-l-4 border-l-bgColor_accent_emphasis border border-borderColor_default rounded-md flex-col relative">
      {children}
    </section>
  );
};

export const CardSection: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="w-full p-4 flex flex-col items-center">{children}</div>
  );
};
export const CardBottom: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-20 flex items-center w-full border-t border-t-borderColor_default mt-2 p-4">
      {children}
    </div>
  );
};
