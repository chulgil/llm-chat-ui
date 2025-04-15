import { FC } from "react"
import { useTranslation } from "react-i18next"

interface PromptSelectProps {
  prompt: string
  onPromptChange: (prompt: string) => void
}

export const PromptSelect: FC<PromptSelectProps> = ({
  prompt,
  onPromptChange
}) => {
  const { t } = useTranslation()

  return (
    <div className="space-y-2">
      <div className="text-sm font-bold">{t("prompt")}</div>
      <textarea
        className="w-full rounded border p-2"
        value={prompt}
        onChange={e => onPromptChange(e.target.value)}
        rows={4}
      />
    </div>
  )
}
