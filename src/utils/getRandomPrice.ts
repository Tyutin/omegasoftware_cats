export default function getRandomPrice() {
  let rand = 200 + Math.random() * (2000 + 1 - 200);
  return Math.floor(rand);
}