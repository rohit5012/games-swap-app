import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/Card";

export default function GameList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wishlist</CardTitle>
        <CardDescription>Games I want!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-5">
          <div>
            <img
              className="size-80"
              src="https://vignette.wikia.nocookie.net/halo/images/a/a0/Halo-3-wallpaper-master-chief-emotion-portrait.jpg/revision/latest/scale-to-width-down/2000?cb=20110218233339&path-prefix=es"
            />
            <p>Halo 3</p>
            <p>Release Date: 2007</p>
          </div>
          <div>
            <img
              className="size-80"
              src="http://vignette2.wikia.nocookie.net/doblaje/images/8/8a/Halo_2.jpg/revision/latest?cb=20150322203254&path-prefix=es"
            />
            <p>Halo 2</p>
            <p>Release Date: 2004</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
