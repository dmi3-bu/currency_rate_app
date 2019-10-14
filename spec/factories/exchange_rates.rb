# frozen_string_literal: true

FactoryBot.define do
  factory :exchange_rate do
    rate { rand(1.0...100.0).round(2) }
    admin { false }
    created_at { Time.now }
    updated_at { Time.now }
    deleted_at { nil }
    valid_till { nil }

    trait :admin do
      admin { true }
      valid_till { Time.now + 1.day }
    end
  end
end
