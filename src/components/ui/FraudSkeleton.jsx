import SkeletonRow from "./SkeletonRow";

export default function FraudSkeleton() {
    return (
        <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonRow key={i} />
            ))}
        </div>
    );
}
