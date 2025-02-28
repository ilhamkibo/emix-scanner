export default function BatchList({ data, title }) {
  return (
    <p>
      {title} <span className="font-semibold">{data}</span>
    </p>
  );
}
