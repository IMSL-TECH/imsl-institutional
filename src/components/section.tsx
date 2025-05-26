import { FC } from "react";

interface SectionProps extends React.ComponentProps<"div"> {
    backgroundColor?: string
}

const Section: FC<SectionProps> = ({ className = "", children, backgroundColor = "", ...props }) => {
    return (
        <section
            className={`w-full py-12 lg:py-16 px-6 md:px-12 lg:px-24 flex justify-center ${backgroundColor}`}
        >
            <div className={`max-w-7xl w-full ${className}`} {...props}>{children}</div>
        </section>
    );
};

export default Section;
