# frozen_string_literal: true

every 1.hour do
  rake 'db:update_exchange_rate'
end

every 1.minute do
  rake 'db:deactivate_exchange_rate'
end

# Learn more: http://github.com/javan/whenever
