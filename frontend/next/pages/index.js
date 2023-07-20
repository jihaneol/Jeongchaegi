import Link from 'next/link'

export default function Home() {
	return (
	<div>
    <Link href="/policylist">
      <a>policylist</a>
    </Link>

    <br />

    <Link href="/policyitem">
      <a>policyitem</a>
    </Link>

		<h1>
			정채기 프로젝트
		</h1>
	</div>
	)
}