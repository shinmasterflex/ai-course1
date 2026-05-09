const LEGACY_TO_CURRENT_MODULE_ID: Record<string, string> = {
  "module-4": "module-3",
  "module-6": "module-4",
}

export function normalizeModuleId(moduleId: string): string {
  return LEGACY_TO_CURRENT_MODULE_ID[moduleId] ?? moduleId
}

export function getCompatibleModuleIds(moduleId: string): string[] {
  const normalizedModuleId = normalizeModuleId(moduleId)
  const compatibleIds = [normalizedModuleId]

  Object.entries(LEGACY_TO_CURRENT_MODULE_ID).forEach(([legacyModuleId, currentModuleId]) => {
    if (currentModuleId === normalizedModuleId) {
      compatibleIds.push(legacyModuleId)
    }
  })

  return compatibleIds
}

export function remapModuleRecordKeys<T>(modules: Record<string, T>): Record<string, T> {
  const remapped: Record<string, T> = {}

  Object.entries(modules).forEach(([moduleId, value]) => {
    const normalizedModuleId = normalizeModuleId(moduleId)
    if (normalizedModuleId === moduleId) {
      remapped[normalizedModuleId] = value
    }
  })

  Object.entries(modules).forEach(([moduleId, value]) => {
    const normalizedModuleId = normalizeModuleId(moduleId)
    if (!(normalizedModuleId in remapped)) {
      remapped[normalizedModuleId] = value
    }
  })

  return remapped
}