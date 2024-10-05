interface PageInfoProps {
    title: string;
    subtitle: string;
}

export default function PageInfo({ title, subtitle }: PageInfoProps) {
    return (
        <div className="page-title">
            <h3>{title}</h3>
            <p>{subtitle}</p>
        </div>
    );
}
