import { useRoute } from '@/features/router';

const Pid = () => {
  const route = useRoute();
  const pid = route.params.pid;

  return (
    <ACard
      className="h-full card-wrapper"
      size="small"
      variant="borderless"
    >
      <div className="w-full flex justify-center">
        <div className="max-w-2xl w-full transform px-4">
          <div className="overflow-hidden rounded-xl bg-white shadow-xl transition-all hover:shadow-2xl">
            <div className="from-blue-500 to-indigo-600 bg-gradient-to-r p-6">
              <h1 className="text-2xl text-white font-bold">项目详情</h1>
              <p className="mt-2 text-blue-100">显示当前路由参数</p>
            </div>

            <div className="p-6">
              <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <h2 className="mb-2 text-sm text-gray-500 font-medium">项目标识 (PID)</h2>
                <div className="flex items-center">
                  <div className="mr-3 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-500" />
                  <div className="text-xl text-gray-700 font-semibold font-mono">{pid}</div>
                </div>
              </div>

              <div className="flex justify-between">
                <AButton className="transition-transform hover:scale-105">返回</AButton>

                <AButton
                  className="transition-transform hover:scale-105"
                  type="primary"
                >
                  查看更多信息
                </AButton>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              路由参数使用示例 - 访问 <code className="rounded bg-gray-100 px-1 py-0.5">route.params.pid</code>
              获取当前PID值
            </p>
          </div>
        </div>
      </div>
    </ACard>
  );
};

export default Pid;
