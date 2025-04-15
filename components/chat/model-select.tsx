import { FC } from "react"
import { useTranslation } from "react-i18next"

interface ModelSelectProps {
  model: string
  onModelChange: (model: string) => void
}

export const ModelSelect: FC<ModelSelectProps> = ({ model, onModelChange }) => {
  const { t } = useTranslation()

  return (
    <div className="space-y-2">
      <div className="text-sm font-bold">{t("model")}</div>
      <select
        className="w-full rounded border p-2"
        value={model}
        onChange={e => onModelChange(e.target.value)}
      >
        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
        <option value="gpt-4">GPT-4</option>
      </select>
    </div>
  )
}
