import styles from "./RatingBadge.module.css";

interface RatingBadgeProps {
  rating: number;
}

function getRatingColor(rating: number): string {
  if (rating < 3) return "#E90000";
  if (rating < 5) return "#E97E00";
  if (rating < 7) return "#E9D100";
  return "#66E900";
}

export default function RatingBadge({ rating }: RatingBadgeProps) {
  return (
    <div className={styles.badge} style={{ borderColor: getRatingColor(rating) }}>
      {rating.toFixed(1)}
    </div>
  );
}
