import Title from "./atoms/Title";

function NewsDetail() {
  return (
  <div className="max-w-[1440px] m-auto bg-white py-20">
    <Title />
    <div className="flex flex-col gap-3 items-center justify-center py-5">
      <p>[발행 날짜]</p>
      <p>기사 제목</p>
      <p>기사 내용</p>
    </div>
  </div>
  );
}

export default NewsDetail;