import { useRoute } from '@/features/router';

const ProjectsEditId = () => {
  const route = useRoute();
  const { id, pid } = route.params;

  return (
    <ACard
      className="h-full card-wrapper"
      size="small"
      variant="borderless"
    >
      <div className="h-full flex flex-col items-center justify-center">
        <div className="max-w-3xl w-full">
          <div className="overflow-hidden rounded-xl bg-white shadow-xl transition-all hover:shadow-2xl">
            {/* 标题区域 */}
            <div className="relative overflow-hidden from-indigo-600 to-purple-600 bg-gradient-to-r p-6">
              <div className="absolute h-40 w-40 rounded-full bg-white/10 -right-8 -top-8" />
              <div className="absolute right-20 top-10 h-20 w-20 rounded-full bg-white/10" />
              <h1 className="relative z-10 text-2xl text-white font-bold">项目编辑</h1>
              <p className="relative z-10 mt-2 text-indigo-100">正在编辑项目的详细信息</p>
            </div>

            {/* 参数展示区域 */}
            <div className="p-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* 项目ID卡片 */}
                <div className="border border-indigo-100 rounded-xl from-indigo-50 to-indigo-100 bg-gradient-to-br p-5 shadow-sm transition-all duration-300 hover:shadow-md">
                  <div className="mb-3 flex items-center">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-500 text-white">
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
                          fillRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm text-indigo-800 font-medium">项目标识</h3>
                      <p className="text-xs text-indigo-600">Project ID (PID)</p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/80 px-4 py-3 backdrop-blur-sm">
                    <p className="break-all text-xl text-indigo-900 font-semibold font-mono">{pid}</p>
                  </div>
                </div>

                {/* 编辑ID卡片 */}
                <div className="border border-purple-100 rounded-xl from-purple-50 to-purple-100 bg-gradient-to-br p-5 shadow-sm transition-all duration-300 hover:shadow-md">
                  <div className="mb-3 flex items-center">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-purple-500 text-white">
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm text-purple-800 font-medium">编辑标识</h3>
                      <p className="text-xs text-purple-600">Edit ID</p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/80 px-4 py-3 backdrop-blur-sm">
                    <p className="break-all text-xl text-purple-900 font-semibold font-mono">{id}</p>
                  </div>
                </div>
              </div>

              {/* 路径显示 */}
              <div className="mt-6 border border-gray-100 rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 text-sm text-gray-500 font-medium">当前路径</h3>
                <div className="flex items-center overflow-x-auto rounded bg-white p-3 text-sm text-gray-600 font-mono">
                  <span className="text-gray-400">/projects/</span>
                  <span className="text-indigo-600">{pid}</span>
                  <span className="text-gray-400">/edit/</span>
                  <span className="text-purple-600">{id}</span>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="mt-8 flex justify-between">
                <AButton className="transition-transform hover:scale-105">返回</AButton>

                <AButton
                  className="transition-transform hover:scale-105"
                  type="primary"
                >
                  保存编辑
                </AButton>
              </div>
            </div>
          </div>

          {/* 底部提示 */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              多级路由参数示例 - 使用 <code className="rounded bg-gray-100 px-1 py-0.5">route.params</code> 获取路由参数
            </p>
          </div>
        </div>
      </div>
    </ACard>
  );
};

export default ProjectsEditId;
