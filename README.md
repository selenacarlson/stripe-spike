*** This is the STIPE SPIKE***

# Here, we aim to prove that to ourselves that we can do with stripe
# what has been asked of us for the co-giv web app

A user needs to:


[x] create a stripe ID 
    - with at least one associated payment source (card)
[x] view own card/customer information
[x] view own subsciptions
[] delete that stripe ID (get out of stripes system)
[] edit card information
[] delete card information

[] make a one time donation to a charity
[x] create a monthly giving subscription to a charity
[] edit a monthly giving subscrition
[] cancel a monthly giving subscription
[] view how much they have given to a particular charity
    - month
    - all time
[] view aggregate giving in app
    - month
    - all time


- ON USERSERVICE LOAD: Build current user with returned Stripe.customer object
    - That object includes:
        - id (Stripe ObjectId)
        - email
        - account_balance
        - created
        - default_source
        - invoice_prefix
        - sources (array of objects)
            - id (Stripe ObjectId)
            - created
            - status
            - type
            - card (object)
                - address_line1_check
                - address_zip_check
                - cvc check
                - card_automatically_updated
                - country
                - brand
                - exp_month
                - exp_year
                - last4
            - owner (object)
                - email
                - name
                - phone
        - subscriptions (array of objects)
            - billing
            - billing_cycle_anchor (unix timestamp)
            - cancel_at_period_end 
            - canceled_at
            - created (unix timestamp)
            - current_period_end (unix timestamp)
            - current_period_start (unix timestamp)
            - id (Stripe ObjectId)
            - plan (object)
                - amount
                - billing_scheme
                - created (unix timestamp)
                - currency
                - id (Stripe ObjectId)
                - interval
                - interval_count
                - nickname
                - product (Stripe ObjectId)
                - start (unix timestamp)
                - status
                - tax_percent
                


       
