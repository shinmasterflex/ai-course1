import nextCoreWebVitals from "eslint-config-next/core-web-vitals"

const eslintConfig = [
	{
		ignores: [".next/**", "out/**", "build/**", "next-env.d.ts", "lib/generated/**"],
	},
	...nextCoreWebVitals,
	{
		rules: {
			"react-hooks/set-state-in-effect": "off",
			"react/no-unescaped-entities": "off",
			"@next/next/no-assign-module-variable": "off",
			"react-hooks/purity": "off",
		},
	},
]

export default eslintConfig
