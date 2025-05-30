
const PrivacyPolicy = () => {
  return (
    <div>
      <h1 className="text-center text-xl my-5">プライバシーポリシー</h1>
      <div className="text-sm w-[90%] mx-auto">
        <p className="px-1">本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）における，ユーザーの個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。</p>
      </div>
      <div className="text-sm w-[90%] mx-auto mt-14">
        <h2 className="text-xl">第1条（個人情報）</h2>
        <p>「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，特定の個人を識別できる情報（個人識別情報）を指します。</p>
        <h2 className="text-xl">第2条（個人情報の収集方法）</h2>
        <p>本サービスは，ユーザーが利用登録をする際に, メールアドレスまたはGoogleアカウント情報を取得します。</p>
        <h2 className="text-xl">第3条（個人情報を収集・利用する目的）</h2>
        <p>本サービスが個人情報を収集・利用する目的は，以下のとおりです。</p>
        <ol className="list-decimal pl-5">
          <li>本サービスサービスの提供・運営のため</li>
          <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
          <li>メンテナンス，重要なお知らせなど必要に応じたご連絡のため</li>
          <li>利用規約に違反したユーザーや，不正・不当な目的でサービスを利用しようとするユーザーの特定をし，ご利用をお断りするため</li>
          <li>ユーザーにご自身の登録情報の閲覧や変更，削除，ご利用状況の閲覧を行っていただくため</li>
          <li>上記の利用目的に付随する目的</li>
        </ol>
        <h2 className="text-xl">第4条（利用目的の変更）</h2>
        <ol className="list-decimal pl-5">
          <li>本サービスは，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，個人情報の利用目的を変更するものとします。</li>
          <li>利用目的の変更を行った場合には，変更後の目的について，本サービス所定の方法により，ユーザーに通知し，または本ウェブサイト上に公表するものとします。</li>
        </ol>
        <h2 className="text-xl">第5条（個人情報の第三者提供）</h2>
        <p>本サービスは，ユーザーの同意を得ることなく第三者に個人情報を提供することはありません。</p>
        <h2 className="text-xl">第6条（個人情報の開示）</h2>
        <ol className="list-decimal pl-5">
          <li>本サービスは，本人から個人情報の開示を求められたときは，本人に対し，遅滞なくこれを開示します。ただし，開示することにより次のいずれかに該当する場合は，その全部または一部を開示しないこともあり，開示しない決定をした場合には，その旨を遅滞なく通知します。なお，個人情報の開示に際しては，1件あたり1，000円の手数料を申し受けます。</li>
          <ol style={{ listStyleType: 'lower-alpha' }} className="pl-5">
            <li>本人または第三者の生命，身体，財産その他の権利利益を害するおそれがある場合</li>
            <li>本サービスの業務の適正な実施に著しい支障を及ぼすおそれがある場合</li>
            <li>その他法令に違反することとなる場合</li>
          </ol>
          <li>前項の定めにかかわらず，履歴情報および特性情報などの個人情報以外の情報については，原則として開示いたしません。</li>
        </ol>
        <h2 className="text-xl">第7条（プライバシーポリシーの変更）</h2>
        <ol className="list-decimal pl-5">
          <li>本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。</li>
          <li>本サービスが別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。</li>
        </ol>
        <p className="text-right">以上</p>
      </div>
    </div>
  )
}

export default PrivacyPolicy
