import { client, ContentNodeIdTypeEnum } from "client";
import { useRouter } from "next/router";
import { PostComponent } from "./posts/[postSlug]";
import { PageComponent } from "./[...pageUri]";

export default function Preview() {
  const router = useRouter();
  const { query } = router;
  const { p } = query;

  const auth = client.auth.useAuth();

  const node = client.auth.useQuery().contentNode({
    id: p as string,
    idType: ContentNodeIdTypeEnum.DATABASE_ID,
    asPreview: true,
  });

  if (!p || auth.isAuthenticated === undefined) {
    return <>Loading</>;
  }

  const postType = node?.__typename;

  switch (postType) {
    case "Page":
      return <PageComponent page={node?.$on?.Page} />;
    case "Post":
      return <PostComponent post={node?.$on?.Post} />;
    // case "Event":
    //     return <EventComponent post={node?.$on?.Event} />;
    default:
      return <>Not found</>;
  }
}
